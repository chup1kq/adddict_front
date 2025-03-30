const dicts = [
    {
        id: 1,
        title: 'dict 1',
        description: 'description for dict 1',
    },
    {
        id: 2,
        title: 'dict 2',
        description: 'very long description for dict 2 very long description for dict 2',
    },
    {
        id: 3,
        title: 'dict 3',
        description: 'description for dict 3',
    },
    {
        id: 4,
        title: 'dict 4',
        description: 'description for dict 4',
    }
];

export const UserDictionaries = () => {
    return (
        <div className="container my-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                {dicts.map((dict) => (
                    <div className="col" key={dict.id}>
                        <div className="card h-100" id={dict.id}>
                            <div className="card-body">
                                <h5 className="card-title">{dict.title}</h5>
                                <p className="card-text">{dict.description}</p>
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};