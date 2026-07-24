use crate::util::readline;

pub fn compute<T>(operation: &str, function: fn(v: &[f64]) -> T) -> T {
    let mut values: Vec<f64> = vec![];

    let mut total_input: u8 = loop {
        let mut str_input = String::new();
        readline(
            &format!("How many numbers for {}: ", operation),
            &mut str_input,
        );

        match str_input.trim().parse::<u8>() {
            Ok(value) => break value,
            Err(_) => {
                println!("Please enter a valid number.");
                continue;
            }
        }
    };

    let mut incrementor: u8 = 1;

    while total_input != 0 {
        let mut num_str = String::new();
        readline(&format!("{}: ", incrementor), &mut num_str);
        let num = match num_str.trim() {
            "" => {
                println!("default value for number {}: 0", incrementor);
                0f64
            }
            _ => match num_str.trim().parse::<f64>() {
                Ok(number) => number,
                Err(_) => {
                    println!("Please enter a valid number");
                    continue;
                }
            },
        };

        values.push(num);

        total_input -= 1;
        incrementor += 1;
    }

    function(&values)
}
