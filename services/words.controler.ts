
export function CanIJustifyThis(input:string, wordAvailableToday: number): number {
    const tab = input.split(" ")
    if (tab.length > wordAvailableToday) 
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