# CLI Unit Converter

A small interactive unit converter written in Rust. It supports Length, Weight, Volume, and Temperature conversions.

## Run

```sh
cargo run -- --unit length
```

Available units: `length`, `weight`, `volume`, and `temperature`.

The app lists the available codes for the chosen unit type, then prompts for a unit to convert from, a value, and a unit to convert to, printing the result. Enter `try` to run another conversion or `quit` to exit.

## Test

```sh
cargo test
```
