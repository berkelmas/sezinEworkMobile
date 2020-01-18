import { colors } from "../assets/styles/colors";

export const _renderStatus = param => {
  switch (param) {
    case 3:
      return "Tamamlandı";
    case 2:
      return "Yapılıyor";
    case 1:
      return "Başlanmadı";
    default:
      break;
  }
};

export const _renderStatusColor = param => {
  switch (param) {
    case 3:
      return colors.green;
    case 2:
      return colors.blue;
    case 1:
      return colors.red;
    default:
      break;
  }
};
