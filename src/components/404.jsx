import '../static/styles/404.css';

export const NotFound = () => {
    return (
        <div className="container align-content-center" style={{ minHeight: "100vh" }}>
            <div className="row">
                <div className="col not-found">
                    <h1>404</h1>
                </div>
                <div className="col not-found-info">
                    <p>Извините, информация, которую вы ищете, не существует или была удалена.</p>
                </div>
            </div>
        </div>
    );
}