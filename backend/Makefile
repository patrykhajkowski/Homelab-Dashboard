.PHONY: install lint format test run

install:
	pip install -r requirements-dev.txt

lint:
	ruff check .

format:
	ruff format .

test:
	pytest

run:
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
