const colorpicker1 = document.getElementById("cp1");
const colorpicker2 = document.getElementById("cp2");
const txtinput1 = document.getElementById("txt1");
const txtinput2 = document.getElementById("txt2");
const checkBtn = document.getElementById("checkbtn");
const res = document.getElementById("result");
const sentence = document.getElementById("sample_txt");
const bg = document.getElementById("sample");
const sub = document.getElementById("subtitle");

colorpicker1.addEventListener("input", function(event) {
    res.textContent = "";
    sub.textContent = "";
    const colorval = event.target.value;
    txtinput1.value = colorval;
    sentence.style.color = colorval;
});
colorpicker2.addEventListener("input", function(event){
    res.textContent = "";
    sub.textContent = "";
    const colorval = event.target.value;
    txtinput2.value = colorval;
    bg.style.background = colorval;
});
txtinput1.addEventListener("input", function(){
    res.textContent = "";
    sub.textContent = "";
    const colorval = txtinput1.value.trim();
    if(isValidHex(colorval)){
        colorpicker1.value = colorval;
        txtinput1.style.border = "2px solid black";
        sentence.style.color = colorval;
        checkBtn.disabled = false;
    }
    else {
        txtinput1.style.border = "2px solid red";
        checkBtn.disabled = true;
    }
});
txtinput2.addEventListener("input", function(){
    res.textContent = "";
    sub.textContent = "";
    const colorval = txtinput2.value.trim();
    if(isValidHex(colorval)){
        colorpicker2.value = colorval;
        txtinput2.style.border = "2px solid black";
        bg.style.background = colorval;
        checkBtn.disabled = false;
    }
    else {
        txtinput2.style.border = "2px solid red";
        checkBtn.disabled = true;
    }
});
checkBtn.addEventListener("click", function(){
    let hex1 = colorpicker1.value;
    let hex2 = colorpicker2.value;
    const chex1 = hexToRgb(hex1);
    const chex2 = hexToRgb(hex2);
    const l1 = calculateRelativeLuminance(chex1);
    const l2 = calculateRelativeLuminance(chex2);
    const light = Math.max(l1, l2);
    const dark = Math.min(l1, l2);
    const ratio = (light + 0.05)/(dark + 0.05);
    let message = categorizeContrast(ratio);
    res.textContent = message;
    sub.textContent = "Contrast Ratio";
});
function categorizeContrast(ratio){
    if (ratio > 12) {
        res.style.color = "#0be040";
        return "Super";
    } else if (ratio > 7) {
        res.style.color = "#12872f";
        return "Very Good";
    } else if (ratio > 5) {
        res.style.color = "#1a1a1a";
        return "Good";
    } else if (ratio > 3) {
        res.style.color = "#a41e1e";
        return "Poor";
    } else {
        res.style.color = "#e50b0b";
        return "Very Poor";
    }
}
function calculateRelativeLuminance(rgb){
    const srgb = normalizeRGB(rgb);
    return 0.2126*srgb.r + 0.7152*srgb.g + 0.0722*srgb.b;
}
function normalizeRGB(rgb){
    for (let key in rgb) {
        if (rgb.hasOwnProperty(key)) {
          let i = (rgb[key] / 255);
          rgb[key] = i < 0.03928? i / 12 / 92 : Math.pow((i + 0.055) / 1.055, 2.4);
        }
      }
    return rgb;
}
function isValidHex(input) {
    const hexPattern = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    return hexPattern.test(input);
}
function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return {
        r: r,
        g: g,
        b: b
    };
}