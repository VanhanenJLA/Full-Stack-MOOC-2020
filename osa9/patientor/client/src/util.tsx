import { Gender } from "./types";

export const toGenderIconName = (gender: Gender) => {

  switch (gender) {
    case Gender.Male:
      return "mars";

    case Gender.Female:
      return "venus";

    default:
      console.error('Unknown gender:', gender);
      return "genderless";
  }

}