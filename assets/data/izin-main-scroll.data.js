import NewIzinImage from "../images/izin/new-izin-photo.png";
import IzinTaleplerimImage from "../images/izin/izin-taleplerim-photo.png";
import IzinApproveImage from "../images/izin/izin-onay-image.png";
import IzinCancelApproveImage from "../images/izin/izin-iptal-onay-image.png";

export const izinMainScrollData = [
  {
    id: "123",
    image: NewIzinImage,
    title: "Yeni İzin Talebi",
    backendNames: ["NewIzin"],
    link: "NewIzin",
    content: "Buradan Yeni İzin Talebinde Bulunabilirsiniz."
  },
  {
    id: "233",
    image: IzinTaleplerimImage,
    title: "İzin Taleplerim",
    backendNames: ["MR", "CT"],
    link: "MyIzinRequests",
    content: "Buradan İzin Taleplerinizi Takip Edebilirsiniz."
  },
  {
    id: "999",
    image: IzinApproveImage,
    title: "İzin Talebi Onayı",
    link: "IzinOnay",
    backendNames: ["AnalysisKMD"],
    content: "Buradan Onayınızdaki İzin Taleplerini Yönetebilirsiniz."
  },
  {
    id: "919",
    image: IzinCancelApproveImage,
    title: "İzin İptal Onayı",
    link: "IzinCancelApprove",
    backendNames: ["AnalysisKMD"],
    content: "Buradan Personellerin İzin İptallerini Yönetebilirsiniz."
  }
];
