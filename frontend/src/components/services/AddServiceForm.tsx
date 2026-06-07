import { type FormEvent, useState } from "react";
import { apiFetch } from "../../api/fetch";
import type { ServiceCreateInput, ServiceFieldErrors } from "../../types/service";
import {
  SERVICE_ICON_OPTIONS,
  SERVICE_STATUSES,
  slugify,
  validateServiceInput,
} from "../../types/service";
import "./AddServiceForm.css";

type AddServiceFormProps = {
  onSuccess: () => void;
};

const EMPTY_FORM: ServiceCreateInput = {
  id: "",
  name: "",
  status: "unknown",
  icon: "custom",
};

export function AddServiceForm({ onSuccess }: AddServiceFormProps) {
  const [form, setForm] = useState<ServiceCreateInput>(EMPTY_FORM);
  const [customIcon, setCustomIcon] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ServiceFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const resolvedIcon = form.icon === "custom" ? customIcon : form.icon;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const payload: ServiceCreateInput = {
      ...form,
      id: slugify(form.id || form.name),
      icon: slugify(resolvedIcon || form.name),
    };

    const errors = validateServiceInput(payload);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await apiFetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 409) {
        setSubmitError("A service with this ID already exists");
        return;
      }

      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`);
      }

      setForm(EMPTY_FORM);
      setCustomIcon("");
      setFieldErrors({});
      setOpen(false);
      onSuccess();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Could not create service",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="add-service">
      <div className="add-service__header">
        <h2 className="add-service__title">Add service</h2>
        <button
          type="button"
          className="add-service__toggle"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
        >
          {open ? "Hide form" : "Show form"}
        </button>
      </div>

      {open && (
        <form className="add-service-form" onSubmit={handleSubmit} noValidate>
          <div className="add-service-form__grid">
            <div className="add-service-form__field">
              <label className="add-service-form__label" htmlFor="service-name">
                Name
              </label>
              <input
                id="service-name"
                className={`add-service-form__input ${fieldErrors.name ? "add-service-form__input--error" : ""}`}
                type="text"
                value={form.name}
                onChange={(event) => {
                  const name = event.target.value;
                  setForm((current) => ({
                    ...current,
                    name,
                    id: current.id || slugify(name),
                  }));
                  if (fieldErrors.name) {
                    setFieldErrors((current) => ({ ...current, name: undefined }));
                  }
                }}
                placeholder="e.g. Jellyfin"
                aria-invalid={Boolean(fieldErrors.name)}
              />
              {fieldErrors.name && (
                <p className="add-service-form__error" role="alert">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div className="add-service-form__field">
              <label className="add-service-form__label" htmlFor="service-id">
                Service ID
              </label>
              <input
                id="service-id"
                className={`add-service-form__input ${fieldErrors.id ? "add-service-form__input--error" : ""}`}
                type="text"
                value={form.id}
                onChange={(event) => {
                  setForm((current) => ({
                    ...current,
                    id: slugify(event.target.value),
                  }));
                  if (fieldErrors.id) {
                    setFieldErrors((current) => ({ ...current, id: undefined }));
                  }
                }}
                placeholder="e.g. jellyfin"
                aria-invalid={Boolean(fieldErrors.id)}
              />
              <p className="add-service-form__hint">
                Lowercase slug used in the API. Auto-filled from name.
              </p>
              {fieldErrors.id && (
                <p className="add-service-form__error" role="alert">
                  {fieldErrors.id}
                </p>
              )}
            </div>

            <div className="add-service-form__field">
              <label className="add-service-form__label" htmlFor="service-status">
                Status
              </label>
              <select
                id="service-status"
                className={`add-service-form__input ${fieldErrors.status ? "add-service-form__input--error" : ""}`}
                value={form.status}
                onChange={(event) => {
                  setForm((current) => ({
                    ...current,
                    status: event.target.value as ServiceCreateInput["status"],
                  }));
                  if (fieldErrors.status) {
                    setFieldErrors((current) => ({ ...current, status: undefined }));
                  }
                }}
                aria-invalid={Boolean(fieldErrors.status)}
              >
                {SERVICE_STATUSES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {fieldErrors.status && (
                <p className="add-service-form__error" role="alert">
                  {fieldErrors.status}
                </p>
              )}
            </div>

            <div className="add-service-form__field">
              <label className="add-service-form__label" htmlFor="service-icon">
                Icon
              </label>
              <select
                id="service-icon"
                className="add-service-form__input"
                value={form.icon}
                onChange={(event) => {
                  setForm((current) => ({ ...current, icon: event.target.value }));
                  if (fieldErrors.icon) {
                    setFieldErrors((current) => ({ ...current, icon: undefined }));
                  }
                }}
              >
                {SERVICE_ICON_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {form.icon === "custom" && (
            <div className="add-service-form__field">
              <label className="add-service-form__label" htmlFor="service-custom-icon">
                Custom icon key
              </label>
              <input
                id="service-custom-icon"
                className={`add-service-form__input ${fieldErrors.icon ? "add-service-form__input--error" : ""}`}
                type="text"
                value={customIcon}
                onChange={(event) => {
                  setCustomIcon(slugify(event.target.value));
                  if (fieldErrors.icon) {
                    setFieldErrors((current) => ({ ...current, icon: undefined }));
                  }
                }}
                placeholder="e.g. jellyfin"
                aria-invalid={Boolean(fieldErrors.icon)}
              />
              {fieldErrors.icon && (
                <p className="add-service-form__error" role="alert">
                  {fieldErrors.icon}
                </p>
              )}
            </div>
          )}

          {submitError && (
            <p className="add-service-form__submit-error" role="alert">
              {submitError}
            </p>
          )}

          <button
            className="add-service-form__submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Adding..." : "Add service"}
          </button>
        </form>
      )}
    </section>
  );
}
