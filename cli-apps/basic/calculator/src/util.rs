use std::io::{self, Write};

pub fn readline(string: &str, value: &mut String) {
    print!("{}", string);
    io::stdout().flush().unwrap();

    io::stdin().read_line(&mut *value).unwrap();
}

pub fn clear_screen() {
    print!("\x1B[2J\x1B[1;1H");
    io::stdout().flush().unwrap();
}
