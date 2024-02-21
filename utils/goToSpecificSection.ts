
export const goToSpecificSection = (id: string) => {
    const sectionId = document.getElementById(id)
    if (sectionId) {
        sectionId.scrollIntoView({ behavior: "smooth" })
    }
};
