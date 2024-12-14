import { scrape } from "$lib/server/scraper/index";

export const load = async () => {
    scrape(
        "CSADPRG",
        "GEUSELF",
        "CSARCH1",
        "CCAPDEV",
        "POLPHIM",
        "PE2FTEX",
        "CCINOV8",
        "LASARE2",
        "SAS2000"
    );
};
