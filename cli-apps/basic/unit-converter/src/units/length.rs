use crate::units::{RatioUnit, Unit, UnitList};
use std::{
    fmt::{self, Display, Formatter},
    str::FromStr,
};

struct Meter;
struct Kilometer;
struct Centimeter;
struct Mile;
struct Yard;
struct Foot;
struct Inch;

#[derive(Clone, Copy)]
pub enum Length {
    Meter,
    Kilometer,
    Centimeter,
    Mile,
    Yard,
    Foot,
    Inch,
}

impl RatioUnit for Meter {
    const FACTOR: f64 = 1.0;
}
impl RatioUnit for Kilometer {
    const FACTOR: f64 = 1000.0;
}
impl RatioUnit for Centimeter {
    const FACTOR: f64 = 0.01;
}
impl RatioUnit for Mile {
    const FACTOR: f64 = 1609.344;
}
impl RatioUnit for Yard {
    const FACTOR: f64 = 0.9144;
}
impl RatioUnit for Foot {
    const FACTOR: f64 = 0.3048;
}
impl RatioUnit for Inch {
    const FACTOR: f64 = 0.0254;
}

impl Unit for Length {
    fn value_from_base(&self, value: f64) -> f64 {
        match self {
            Self::Meter => Meter.value_to_base(value),
            Self::Kilometer => Kilometer.value_to_base(value),
            Self::Centimeter => Centimeter.value_to_base(value),
            Self::Mile => Mile.value_to_base(value),
            Self::Yard => Yard.value_to_base(value),
            Self::Foot => Foot.value_to_base(value),
            Self::Inch => Inch.value_to_base(value),
        }
    }

    fn value_to_base(&self, value: f64) -> f64 {
        match self {
            Self::Meter => Meter.value_from_base(value),
            Self::Kilometer => Kilometer.value_from_base(value),
            Self::Centimeter => Centimeter.value_from_base(value),
            Self::Mile => Mile.value_from_base(value),
            Self::Yard => Yard.value_from_base(value),
            Self::Foot => Foot.value_from_base(value),
            Self::Inch => Inch.value_from_base(value),
        }
    }
}

impl UnitList for Length {
    const ITEMS: &'static [(&'static str, Length)] = &[
        ("m", Self::Meter),
        ("km", Self::Kilometer),
        ("cm", Self::Centimeter),
        ("ml", Self::Mile),
        ("y", Self::Yard),
        ("ft", Self::Foot),
        ("i", Self::Inch),
    ];
}

impl FromStr for Length {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Self::parse(s)
    }
}

impl Display for Length {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        let s = match self {
            Self::Centimeter => "centimeter",
            Self::Foot => "foot",
            Self::Inch => "inch",
            Self::Kilometer => "kilometer",
            Self::Meter => "meter",
            Self::Mile => "mile",
            Self::Yard => "yard",
        };
        write!(f, "{s}")
    }
}
