use crate::units::{RatioUnit, Unit, UnitList};
use std::{
    fmt::{self, Display, Formatter},
    str::FromStr,
};

struct Kilogram;
struct Gram;
struct Pound;
struct Ounce;

#[derive(Clone, Copy)]
pub enum Weight {
    Kilogram,
    Gram,
    Pound,
    Ounce,
}

impl RatioUnit for Kilogram {
    const FACTOR: f64 = 1.0;
}

impl RatioUnit for Gram {
    const FACTOR: f64 = 0.001;
}
impl RatioUnit for Pound {
    const FACTOR: f64 = 0.453592;
}
impl RatioUnit for Ounce {
    const FACTOR: f64 = 0.0283495;
}

impl Unit for Weight {
    fn value_from_base(&self, value: f64) -> f64 {
        match self {
            Self::Kilogram => Kilogram.value_to_base(value),
            Self::Gram => Gram.value_to_base(value),
            Self::Pound => Pound.value_to_base(value),
            Self::Ounce => Ounce.value_to_base(value),
        }
    }

    fn value_to_base(&self, value: f64) -> f64 {
        match self {
            Self::Kilogram => Kilogram.value_from_base(value),
            Self::Gram => Gram.value_from_base(value),
            Self::Pound => Pound.value_from_base(value),
            Self::Ounce => Ounce.value_from_base(value),
        }
    }
}

impl UnitList for Weight {
    const ITEMS: &'static [(&'static str, Self)] = &[
        ("kg", Self::Kilogram),
        ("g", Self::Gram),
        ("p", Self::Pound),
        ("o", Self::Ounce),
    ];
}

impl FromStr for Weight {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Self::parse(s)
    }
}

impl Display for Weight {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        let s = match self {
            Self::Kilogram => "kilogram",
            Self::Gram => "gram",
            Self::Pound => "pound",
            Self::Ounce => "ounce",
        };
        write!(f, "{s}")
    }
}
