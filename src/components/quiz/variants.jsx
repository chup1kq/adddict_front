export const Variants = ({variants, onClick}) => {
    return (
        <ul>
            {variants.map((variant, index) => (
                <li
                    key={index}
                    onClick={() => onClick(variant.translate)}
                >
                    {variant.translate}
                </li>
            ))}
        </ul>
    );
}