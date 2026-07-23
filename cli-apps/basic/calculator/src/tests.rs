#[cfg(test)]
use crate::operations::{addition, division, modulus, multiplication, subtraction};

// Addition

#[test]
fn addition_two_positive_numbers() {
    assert_eq!(addition(&[2.0, 2.0]), 4.0);
}

#[test]
fn addition_multiple_numbers() {
    assert_eq!(addition(&[1.0, 2.0, 3.0, 5.0, 100.0]), 111.0);
}

#[test]
fn addition_with_negative_and_decimal_numbers() {
    assert_eq!(addition(&[-2.5, 1.0, 4.5]), 3.0);
}

#[test]
fn addition_with_no_numbers() {
    assert_eq!(addition(&[]), 0.0);
}

#[test]
fn addition_with_one_number() {
    assert_eq!(addition(&[2.0]), 2.0);
}

// Subtraction

#[test]
fn subtraction_two_numbers() {
    assert_eq!(subtraction(&[2.0, 4.0]), -2.0);
}

#[test]
fn subtraction_multiple_numbers() {
    assert_eq!(subtraction(&[20.0, 5.0, 3.0]), 12.0);
}

#[test]
fn subtraction_with_no_or_one_number() {
    assert_eq!(subtraction(&[]), 0.0);
    assert_eq!(subtraction(&[7.0]), 7.0);
}

// Multiplication

#[test]
fn multiplication_two_numbers() {
    assert_eq!(multiplication(&[3.0, 4.0]), 12.0);
}

#[test]
fn multiplication_multiple_numbers_including_a_negative() {
    assert_eq!(multiplication(&[2.0, -3.0, 4.0]), -24.0);
}

#[test]
fn multiplication_with_zero() {
    assert_eq!(multiplication(&[9.0, 0.0, 5.0]), 0.0);
}

#[test]
fn multiplication_with_no_or_one_number() {
    assert_eq!(multiplication(&[]), 1.0);
    assert_eq!(multiplication(&[7.0]), 7.0);
}

// Division

#[test]
fn division_two_numbers() {
    assert_eq!(division(&[12.0, 3.0]), Ok(4.0));
}

#[test]
fn division_multiple_numbers() {
    assert_eq!(division(&[100.0, 5.0, 2.0]), Ok(10.0));
}

#[test]
fn division_with_decimal_result() {
    assert_eq!(division(&[7.5, 2.0]), Ok(3.75));
}

#[test]
fn division_with_zero_as_the_first_number() {
    assert_eq!(division(&[0.0, 5.0]), Ok(0.0));
}

#[test]
fn cannot_divide_by_zero() {
    assert_eq!(
        division(&[0.0, 0.0]),
        Err(String::from("Cannot divide by zero"))
    );
}

#[test]
fn division_with_no_or_one_number() {
    assert_eq!(division(&[]), Ok(0.0));
    assert_eq!(division(&[7.0]), Ok(7.0));
}

// Modulus

#[test]
fn modulus_two_numbers() {
    assert_eq!(modulus(&[10.0, 3.0]), Ok(1.0));
}

#[test]
fn modulus_multiple_numbers() {
    assert_eq!(modulus(&[20.0, 6.0, 3.0]), Ok(2.0));
}

#[test]
fn modulus_with_negative_dividend() {
    assert_eq!(modulus(&[-10.0, 3.0]), Ok(-1.0));
}

#[test]
fn modulus_with_no_or_one_number() {
    assert_eq!(modulus(&[]), Ok(0.0));
    assert_eq!(modulus(&[7.0]), Ok(7.0));
}

#[test]
fn cannot_calculate_modulus_by_zero() {
    assert_eq!(
        modulus(&[0.0, 0.0]),
        Err(String::from("Cannot calculate modulus by zero"))
    );
}
