type scrollPageType = {
    amount: number;
};
export const scrollPageBy = (amount = 100): scrollPageType => {
        return window.scrollTo({
            top: window.pageYOffset + amount,
            behavior: 'smooth'
        });
}