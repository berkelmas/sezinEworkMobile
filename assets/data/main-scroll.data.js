import IsEmri from "../images/is-emri.jpg";
import TeknikOda from "../images/teknik-oda.jpg";
import SahaTakibi from "../images/saha-takibi.jpg";
import GunlukRapor from "../images/rapor.jpg";
import Yardim from "../images/yardim.jpg";

export const mainScrollData = [
  {
    id: "123",
    image: IsEmri,
    title: "İş Emri",
    link: "NewBusinessOrder",
    backendNames: ["NewWork"],
    content: "Buradan Yeni İş Emirleri Düzenleyebilirsiniz."
  },
  {
    id: "233",
    image: TeknikOda,
    title: "Teknik Oda",
    link: "TechnicalRoom",
    backendNames: ["MR", "CT"],
    content: "Buradan Teknik Odalarla İlgili Bildirimlerinizi Yapabilirsiniz."
  },
  {
    id: "1221",
    image: SahaTakibi,
    title: "Saha Takibi",
    link: "BusinessReport",
    backendNames: ["NewArea"],
    content: "Buradan Saha Takip Raporu Düzenleyebilirsiniz."
  },
  {
    id: "999",
    image: GunlukRapor,
    title: "Günlük Rapor",
    link: "DailyReport",
    backendNames: [
      "AnalysisKMD",
      "AnalysisMAMO",
      "AnalysisUSG",
      "AnalysisRAPOR"
    ],
    content: "Buradan Günlük Raporlarınızı Oluşturabilirsiniz."
  },
  {
    id: "443",
    image: Yardim,
    title: "Yardım",
    link: "GetHelpAfterLoginScreen",
    backendNames: ["shown"],
    content: "Buradan Uygulama Sorunlarınız İçin Yardım Alabilirsiniz."
  }
];
