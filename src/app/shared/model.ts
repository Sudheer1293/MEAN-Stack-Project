
export class Contact {
    _id: string;
    empid: string;
    name: string;
    company: string;
    filePath: string;
    previousCompanies: PreviousCompany[];
}

export class PreviousCompany {
    companyName: string;
    experience: number;
    index: number;
}

export class Tab {
    id: string;
    title?: string;
    active?: boolean;
}

