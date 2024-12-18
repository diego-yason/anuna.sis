import { scrape } from "$lib/server/scraper/index";

export const load = async () => {
    scrape(
        "PE2FTEX",
        "POLPHIM",
        "CALENG1",
        "GEUSELF",
        "CCPROG1",
        "CCPROG2",
        "CCPROG3",
        "CSADPRG",
        "CCINFOM",
        "CCAPDEV",
        "CSSWENG",
        "STSWENG",
        "STHCIUX",
        "CSNETWK",
        "STADVDB",
        "CCICOMP",
        "CCDSTRU",
        "MTH101A",
        "CSMATH1",
        "CSMATH2",
        "STT101A",
        "CSINTSY",
        "CSARCH1",
        "STMETHD",
        "THS-ST1",
        "THS-ST2",
        "THS-ST3",
        "CCINOV8",
        "MOBDEVE",
        "CSSECDV",
        "PRECSST",
        "CSARCH2",
        "LBYARCH",
        "CSPOESY",
        "STDISCM",
        "STINTSY",
        "ST-MATH",
        "CSMODEL"
    );
};
