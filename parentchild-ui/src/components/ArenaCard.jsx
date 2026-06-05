function ArenaCard({
    arena,
    onBook,
    disabled
}) {

    return (
        <div className="arena-card-wrap">

            <div className="arena-card">

                <span className="arena-format">
                    {arena.format}
                </span>

                <div className="arena-card-body">

                    <h4>{arena.name}</h4>

                    <button
                        className="btn btn-book"
                        disabled={disabled}
                        onClick={() => onBook(arena.id)}
                    >
                        Book
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ArenaCard;
