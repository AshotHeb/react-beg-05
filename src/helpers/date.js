export default function dateFormmatter(date) {
    return new Date(date).toISOString().slice(0, 10);
}