export function isValidJSON(jsonString?: string) {
    if(!jsonString) {
        return false
    }

    try {
      JSON.parse(jsonString);

      return true;
    } catch (e) {
      return false;
    }
  }

  type Score = {
    interest?: number,
    title?: string,
    source?: string | '',
    positive?: number,
    important?: boolean,
    subjectivity?: number,
    hasAds?: boolean,
    quote?: string,
  }
export function getScore(obj: any): Score | null {
    if (typeof obj !== 'object' || obj === null) {
      return null;
    }
  
    const res: Score = {}

    const isInterestValid = typeof obj.interest === 'number';
    if(isInterestValid) {
      res.interest = obj.interest
    }

    const isTitleValid = typeof obj.title === 'string';
    if(isTitleValid) {
      res.title = obj.title
    }

    const isSourceValid = typeof obj.source === 'string';
    if(isSourceValid) {
      res.source = obj.source
    }

    const isPositiveValid = typeof obj.positive === 'number';
    if(isPositiveValid) {
      res.positive = obj.positive
    }

    const isImportantValid = typeof obj.important === 'boolean';
    if(isImportantValid) {
      res.important = obj.important
    }

    const isSubjectivityValid = typeof obj.subjectivity === 'number';
    if(isSubjectivityValid) {
      res.subjectivity = obj.subjectivity
    }

    const hasAdsValid = typeof obj.hasAds === 'boolean';
    if(hasAdsValid) {
      res.hasAds = obj.hasAds
    }

    const quoteValid = typeof obj.quote === 'string';
    if(quoteValid) {
      res.quote = obj.quote
    }
  
    return res;
}