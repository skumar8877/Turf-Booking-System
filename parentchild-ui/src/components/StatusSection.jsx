function StatusSection({
    title,
    tone,
    data
}) {

    return (

        <div className={`status-panel status-panel-${tone}`}>

            <div className="status-heading">

                <h3>{title}</h3>

                <span>{data?.length || 0}</span>

            </div>

            <ul className="status-list">

                {
                    data?.length ? data.map(item => (

                        <li
                            key={item.id}
                            className="status-item"
                        >
                            <span>{item.name}</span>

                            {
                                item.format && (
                                    <span className="status-format">
                                        {item.format}
                                    </span>
                                )
                            }
                        </li>

                    )) : (
                        <li className="status-empty">
                            No slots
                        </li>
                    )
                }

            </ul>

        </div>

    );
}

export default StatusSection;
