use crate::units::{RatioUnit, Unit, UnitList};
use std::{
    fmt::{self, Display, Formatter},
    str::FromStr,
};

struct Liter;
struct Mililiter;
struct Gallon;
struct Cup;

#[derive(Clone, Copy)]
pub enum Volume {
    Liter,
    Mililiter,
    Gallon,
    Cup,
}

impl RatioUnit for Liter {
    const FACTOR: f64 = 1.0;
}

impl RatioUnit for Mililiter {
    const FACTOR: f64 = 0.001;
}

impl RatioUnit for Gallon {
    const FACTOR: f64 = 3.78541;
}

impl RatioUnit for Cup {
    const FACTOR: f64 = 0.236588;
}

impl Unit for Volume {
    fn value_from_base(&self, value: f64) -> f64 {
        match self {
            Self::Liter => Liter.value_to_base(value),
            Self::Mililiter => Mililiter.value_to_base(value),
            Self::Gallon => Gallon.value_to_base(value),
            Self::Cup => Cup.value_to_base(value),
        }
    }

    fn value_to_base(&self, value: f64) -> f64 {
        match self {
            Self::Liter => Liter.value_from_base(value),
            Self::Mililiter => Mililiter.value_from_base(value),
            Self::Gallon => Gallon.value_from_base(value),
            Self::Cup => Cup.value_from_base(value),
        }
    }
}

impl UnitList for Volume {
    const ITEMS: &'static [(&'static str, Self)] = &[
        ("l", Self::Liter),
        ("ml", Self::Mililiter),
        ("g", Self::Gallon),
        ("c", Self::Cup),
    ];
}

impl FromStr for Volume {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Self::parse(s)
    }
}

impl Display for Volume {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        let s = match self {
            Self::Liter => "liter",
            Self::Mililiter => "mililiter",
            Self::Gallon => "gallon",
            Self::Cup => "cup",
        };
        write!(f, "{s}")
    }
}
