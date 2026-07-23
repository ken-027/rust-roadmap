pub fn addition(values: &[f64]) -> f64 {
    let mut total = 0.0;

    for v in values.iter() {
        total += v
    }

    total
}

pub fn subtraction(values: &[f64]) -> f64 {
    let mut total = if !values.is_empty() { values[0] } else { 0f64 };

    for v in values.iter().skip(1) {
        total -= v
    }

    total
}

pub fn multiplication(values: &[f64]) -> f64 {
    let mut total = if !values.is_empty() { values[0] } else { 1f64 };

    for v in values.iter().skip(1) {
        total *= v
    }

    total
}

pub fn division(values: &[f64]) -> Result<f64, String> {
    let mut total = if !values.is_empty() { values[0] } else { 0f64 };

    for v in values.iter().skip(1) {
        if *v == 0f64 {
            return Err(String::from("Cannot divide by zero"));
        }

        total /= v
    }

    Ok(total)
}

pub fn modulus(values: &[f64]) -> Result<f64, String> {
    let mut total = if !values.is_empty() { values[0] } else { 0f64 };

    for v in values.iter().skip(1) {
        if *v == 0f64 {
            return Err(String::from("Cannot calculate modulus by zero"));
        }
        total %= v
    }

    Ok(total)
}
