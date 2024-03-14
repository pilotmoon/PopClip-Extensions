use qrcode::QrCode;
use image::Luma;
use std::env;


fn main() {
    let args = env::args().skip(1);
    for argument in args {
        let bites = argument.as_bytes();
        let code = QrCode::new(bites).unwrap();
        let image = code.render::<Luma<u8>>().build();
        image.save("./qrCode.png").unwrap();
    }
}

