use std::{
    fmt::{self, Display, Formatter},
    str::FromStr,
};

use crate::units::{Unit, UnitList};

struct Celsius;
struct Fahrenheit;
struct Kelvin;

#[derive(Clone, Copy)]
pub enum Temperature {
    Celsius,
    Fahrenheit,
    Kelvin,
}

impl Unit for Celsius {
    fn value_from_base(&self, value: f64) -> f64 {
        value
    }

    fn value_to_base(&self, value: f64) -> f64 {
        value
    }
}

impl Unit for Fahrenheit {
    fn value_from_base(&self, value: f64) -> f64 {
        value * 9.0 / 5.0 + 32.0
    }

    fn value_to_base(&self, value: f64) -> f64 {
        (value - 32.0) * 5.0 / 9.0
    }
}

impl Unit for Kelvin {
    fn value_from_base(&self, value: f64) -> f64 {
        value + 273.15
    }

    fn value_to_base(&self, value: f64) -> f64 {
        value - 273.15
    }
}

impl Unit for Temperature {
    fn value_from_base(&self, value: f64) -> f64 {
        match self {
            Self::Celsius => Celsius.value_to_base(value),
            Self::Fahrenheit => Fahrenheit.value_to_base(value),
            Self::Kelvin => Kelvin.value_to_base(value),
        }
    }

    fn value_to_base(&self, value: f64) -> f64 {
        match self {
            Self::Celsius => Celsius.value_from_base(value),
            Self::Fahrenheit => Fahrenheit.value_from_base(value),
            Self::Kelvin => Kelvin.value_from_base(value),
        }
    }
}

impl UnitList for Temperature {
    const ITEMS: &'static [(&'static str, Temperature)] = &[
        ("c", Self::Celsius),
        ("f", Self::Fahrenheit),
        ("k", Self::Kelvin),
    ];
}

impl FromStr for Temperature {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Self::parse(s)
    }
}

impl Display for Temperature {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        let s = match self {
            Self::Celsius => "celsius",
            Self::Fahrenheit => "fahrenheit",
            Self::Kelvin => "kelvin",
        };
        write!(f, "{s}")
    }
}
