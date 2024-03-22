import { loginRepository } from "../queries/login.repository";

export async function CanIJustifyThis(input:string, username: string): Promise<number> {
    const user = await loginRepository.getUser(username)
    const tab = input.split(" ")
    const resp = await loginRepository.updateUserLogin(username, tab.length)

    if (tab.length > user.words || resp != true) 
        return -1
    return tab.length
}

export function justifyText(text:string, lineLength: number) {
    const words = text.split(' ');
    let line = '';
    let lines = [];

    for (let i = 0; i < words.length; i++) {
        if ((line + words[i]).length <= lineLength) {
            line += words[i] + ' ';
        } else {
            lines.push(line.trim());
            line = words[i] + ' ';
        }
    }

    lines.push(line.trim());

    // Justify lines
    for (let i = 0; i < lines.length; i++) {
        let wordsInLine:string[] = lines[i].split(' ').filter((word: string) => word !== '');
        let lineLengthDiff = lineLength - wordsInLine.join('').length;
        let spacesToAdd = wordsInLine.length - 1;

        while (lineLengthDiff > 0 && spacesToAdd > 0) {
            for (let j = 0; j < wordsInLine.length - 1; j++) {
                wordsInLine[j] += ' ';
                lineLengthDiff--;
                if (lineLengthDiff === 0) break;
            }
            spacesToAdd--;
        }

        lines[i] = wordsInLine.join(' ');
    }

    return lines.join('\n');
}