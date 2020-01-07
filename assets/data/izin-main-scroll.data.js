import NewIzinImage from "../images/izin/new-izin-photo.png";
import IzinImage1 from "../images/izin/izin-image-1.png";
import IzinImage2 from "../images/izin/izin-image-2.png";
import IzinImage5 from "../images/izin/izin-image-4.png";

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
    image: IzinImage1,
    title: "İzin Taleplerim",
    backendNames: ["MR", "CT"],
    link: "MyIzinRequests",
    content: "Buradan İzin Taleplerinizi Takip Edebilirsiniz."
  },
  {
    id: "999",
    image: IzinImage2,
    title: "İzin Talebi Onayı",
    link: "IzinOnay",
    backendNames: ["AnalysisKMD"],
    content: "Buradan Onayınızdaki İzin Taleplerini Yönetebilirsiniz."
  },
  {
    id: "919",
    image: IzinImage5,
    title: "İzin İptal Onayı",
    link: "IzinCancelApprove",
    backendNames: ["AnalysisKMD"],
    content: "Buradan Personellerin İzin İptallerini Yönetebilirsiniz."
  }
];