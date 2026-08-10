#[cfg(test)]
use crate::units::{Length, Temperature, Unit, Volume, Weight};

#[cfg(test)]
fn approx_eq(a: f64, b: f64) -> bool {
    (a - b).abs() < 1e-9
}

// Length

#[test]
fn length_meter_is_identity() {
    assert!(approx_eq(Length::Meter.value_from_base(5.0), 5.0));
    assert!(approx_eq(Length::Meter.value_to_base(5.0), 5.0));
}

#[test]
fn length_kilometer_to_and_value_from_base() {
    assert!(approx_eq(Length::Kilometer.value_from_base(1.0), 1000.0));
    assert!(approx_eq(Length::Kilometer.value_to_base(1000.0), 1.0));
}

#[test]
fn length_centimeter_to_and_value_from_base() {
    assert!(approx_eq(Length::Centimeter.value_from_base(100.0), 1.0));
    assert!(approx_eq(Length::Centimeter.value_to_base(1.0), 100.0));
}

#[test]
fn length_mile_yard_foot_inch_value_from_base() {
    assert!(approx_eq(Length::Mile.value_from_base(1.0), 1609.344));
    assert!(approx_eq(Length::Yard.value_from_base(1.0), 0.9144));
    assert!(approx_eq(Length::Foot.value_from_base(1.0), 0.3048));
    assert!(approx_eq(Length::Inch.value_from_base(1.0), 0.0254));
}

// Weight

#[test]
fn weight_kilogram_is_identity() {
    assert!(approx_eq(Weight::Kilogram.value_from_base(5.0), 5.0));
    assert!(approx_eq(Weight::Kilogram.value_to_base(5.0), 5.0));
}

#[test]
fn weight_gram_to_and_value_from_base() {
    assert!(approx_eq(Weight::Gram.value_from_base(1000.0), 1.0));
    assert!(approx_eq(Weight::Gram.value_to_base(1.0), 1000.0));
}

#[test]
fn weight_pound_and_ounce_value_from_base() {
    assert!(approx_eq(Weight::Pound.value_from_base(1.0), 0.453592));
    assert!(approx_eq(Weight::Ounce.value_from_base(1.0), 0.0283495));
}

// Volume

#[test]
fn volume_liter_is_identity() {
    assert!(approx_eq(Volume::Liter.value_from_base(5.0), 5.0));
    assert!(approx_eq(Volume::Liter.value_to_base(5.0), 5.0));
}

#[test]
fn volume_mililiter_to_and_value_from_base() {
    assert!(approx_eq(Volume::Mililiter.value_from_base(1000.0), 1.0));
    assert!(approx_eq(Volume::Mililiter.value_to_base(1.0), 1000.0));
}

#[test]
fn volume_gallon_and_cup_value_from_base() {
    assert!(approx_eq(Volume::Gallon.value_from_base(1.0), 3.78541));
    assert!(approx_eq(Volume::Cup.value_from_base(1.0), 0.236588));
}

// Temperature

#[test]
fn temperature_celsius_is_identity() {
    assert!(approx_eq(Temperature::Celsius.value_from_base(5.0), 5.0));
    assert!(approx_eq(Temperature::Celsius.value_to_base(5.0), 5.0));
}

#[test]
fn temperature_fahrenheit_to_and_value_from_base() {
    assert!(approx_eq(
        Temperature::Fahrenheit.value_from_base(32.0),
        0.0
    ));
    assert!(approx_eq(
        Temperature::Fahrenheit.value_from_base(212.0),
        100.0
    ));
    assert!(approx_eq(Temperature::Fahrenheit.value_to_base(0.0), 32.0));
    assert!(approx_eq(
        Temperature::Fahrenheit.value_to_base(100.0),
        212.0
    ));
}

#[test]
fn temperature_kelvin_to_and_value_from_base() {
    assert!(approx_eq(Temperature::Kelvin.value_from_base(273.15), 0.0));
    assert!(approx_eq(Temperature::Kelvin.value_to_base(0.0), 273.15));
}
