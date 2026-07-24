.PHONY: help calculator progress-scanner test clippy fmt

help:
	@echo Available commands:
	@echo "  make calculator operator=add       Run the calculator"
	@echo "  make scan              Refresh roadmap progress"
	@echo "  make test app=calculator           Run an app's tests"
	@echo "  make clippy app=calculator         Run Clippy for an app"
	@echo "  make fmt app=calculator            Check an app's formatting"

calculator:
	cargo run -p calculator -- -o ${operator}

scan:
	cargo run -p progress-scanner

test:
	cargo test -p ${app}

clippy:
	cargo clippy -p ${app}

fmt:
	cargo fmt -p ${app} --check
