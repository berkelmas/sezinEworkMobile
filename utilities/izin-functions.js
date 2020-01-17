export const _convertIzinStatus = param => {
  switch (param) {
    case 0:
      return "Bölge Sorumlusunda Onay Bekliyor";
    case 1:
      return "Yönetim Onayı Bekliyor";
    case 2:
      return "Onaylandı";
    case 3:
      return "İptal Edildi";
    case 4:
      return "Türkiye Saha Sorumlusunda Onay Bekliyor";
    case 5:
      return "İptal Sürecinde";
    case 6:
      return "Silindi";
    default:
      break;
  }
};
