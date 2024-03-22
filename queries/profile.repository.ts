import axios, { AxiosError } from "axios"
import { Profile } from "../models/profile.model";


export const profileRepository = {
    async createProfile(profile: Profile) {
      try {
        const resp = await axios.post(
          `http://localhost:3000/profile`,
          { profile: profile },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        return "OK"
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return error.message
        } else {
          console.error("Unexpected Error")
          return "KO";
        }
      }
    }
}
