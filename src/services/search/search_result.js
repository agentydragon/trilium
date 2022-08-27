'use strict';

const beccaService = require('../../becca/becca_service');

class SearchResult {
    constructor(notePathArray) {
        this.notePathArray = notePathArray;
        this.notePathTitle = beccaService.getNoteTitleForPath(notePathArray);
    }

    get notePath() { return this.notePathArray.join('/'); }

    get noteId() { return this.notePathArray[this.notePathArray.length - 1]; }

    computeScore(tokens) {
        this.score = 0;

        // matches in attributes don't get extra points and thus are implicitly
        // valued less than note path matches

        const chunks = this.notePathTitle.toLowerCase().split(' ');

        // TODO: compute the length of the longest common subsequence
        // TODO: match should count for more if it's in the *end* of the page namne

        for (const chunk of chunks) {
            for (const token of tokens) {
                if (chunk === token) {
                    // if token is contained, token length * 4
                    this.score += 4 * token.length;
                }
                else if (chunk.startsWith(token)) {
                    // starts with -> add token length*2
                    this.score += 2 * token.length;
                }
                else if (chunk.includes(token)) {
                    // contains, but does not start with -> add just token length
                    this.score += token.length;
                }
            }
        }
    }
}

module.exports = SearchResult;
