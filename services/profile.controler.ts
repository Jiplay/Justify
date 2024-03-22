import { Profile } from "../models/profile.model";

function isEmailValid(email: string): boolean {
    // Expression régulière pour vérifier une adresse e-mail
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
    // Test de l'adresse e-mail avec la regex
    return regexEmail.test(email);
}

function ageCheck(dateDeNaissance: Date): boolean {
    const aujourdHui = new Date();
    let age = aujourdHui.getFullYear() - dateDeNaissance.getFullYear();
  
    const anniversairePasse = (aujourdHui.getMonth() > dateDeNaissance.getMonth()) ||
                              (aujourdHui.getMonth() === dateDeNaissance.getMonth() && aujourdHui.getDate() >= dateDeNaissance.getDate());
  
    if (!anniversairePasse) {
      age--;
    }
  
    return age > 13;
  }

export function checkProfileData(profile: Profile): boolean {
    if (isEmailValid(profile.email) === false) return false;
    if (ageCheck(new Date(profile.dateOfBirth)) === false) return false;

    return true
}
