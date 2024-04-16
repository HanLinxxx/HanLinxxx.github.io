function is_email(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function check_GUI(GUI) {
  const gui_number = GUI; // 取欄位內容
  const cx = [1, 2, 1, 2, 1, 2, 4, 1];
  const cnum = gui_number.split("");
  let sum = 0;

  function cc(num) {
    let total = num;
    if (total > 9) {
      let s = total.toString();
      const n1 = s.substring(0, 1) * 1;
      const n2 = s.substring(1, 2) * 1;
      total = n1 + n2;
    }
    return total;
  }
  if (gui_number.length !== 8) {
    return false;
  }
  cnum.forEach((item, index) => {
    if (gui_number.charCodeAt() < 48 || gui_number.charCodeAt() > 57) {
      return false;
    }
    sum += cc(item * cx[index]);
  });
  if (sum % 10 === 0) {
    return true;
  } else if (cnum[6] === "7" && (sum + 1) % 10 === 0) {
    return true;
  } else {
    return false;
  }
}
