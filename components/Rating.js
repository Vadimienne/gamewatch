import 'styles/Rating.sass'

export default function rating({ children, critic, user }) {
    return (
        <div className={
            'rating-container' +
            (critic ? ' critic' : '') +
            (user ? ' user': '')}>
            <span className='rating-container__rating'>{children}</span>
        </div>
    )
}