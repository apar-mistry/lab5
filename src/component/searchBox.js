import React, { useState } from 'react';

function SearchBox() {
    const [sortOption, setSortOption] = useState(sessionStorage.getItem('sortBy') || 'viewed');
    const [timeFrame, setTimeFrame] = useState(sessionStorage.getItem('timePeriod') || 1);
    const [numArticles, setNumArticles] = useState(parseInt(sessionStorage.getItem('numArticles'), 10) || 10);

    const handleSearch = (event) => {
        event.preventDefault();
        sessionStorage.setItem('sortBy', sortOption);
        sessionStorage.setItem('timePeriod', timeFrame);
        sessionStorage.setItem('numArticles', numArticles.toString());
        window.location.reload();  // Reload the page to trigger re-fetching in the ArticlesDisplay
    };


    return (
        <form onSubmit={handleSearch}>
            <div className="mb-3">
                <label htmlFor="numArticles">Number of Articles (1-15):</label>
                <input
                    type="number"
                    id="numArticles"
                    className="form-control"
                    value={numArticles}
                    onChange={e => setNumArticles(Math.min(Math.max(1, parseInt(e.target.value, 10)), 15))}
                    min="1"
                    max="15"
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3" >Search</button>
            <div>
                <label>Sort By:</label>
                <div className="form-check">
                    <input type="radio" id="mostViewed" name="sortOption" value="viewed"
                           checked={sortOption === 'viewed'} onChange={e => setSortOption(e.target.value)}
                           className="form-check-input"/>
                    <label htmlFor="mostViewed" className="form-check-label">Most Viewed</label>
                </div>
                <div className="form-check">
                    <input type="radio" id="mostShared" name="sortOption" value="shared"
                           checked={sortOption === 'shared'} onChange={e => setSortOption(e.target.value)}
                           className="form-check-input"/>
                    <label htmlFor="mostShared" className="form-check-label">Most Shared</label>
                </div>
                <div className="form-check">
                    <input type="radio" id="mostEmailed" name="sortOption" value="emailed"
                           checked={sortOption === 'emailed'} onChange={e => setSortOption(e.target.value)}
                           className="form-check-input"/>
                    <label htmlFor="mostEmailed" className="form-check-label">Most Emailed</label>
                </div>
            </div>
            <div>
                <label>Time Frame:</label>
                <div className="form-check">
                    <input type="radio" id="day" name="timeFrame" value="1"
                           checked={timeFrame === '1'} onChange={e => setTimeFrame(e.target.value)}
                           className="form-check-input"/>
                    <label htmlFor="day" className="form-check-label">Day</label>
                </div>
                <div className="form-check">
                    <input type="radio" id="week" name="timeFrame" value="7"
                           checked={timeFrame === '7'} onChange={e => setTimeFrame(e.target.value)}
                           className="form-check-input"/>
                    <label htmlFor="week" className="form-check-label">Week</label>
                </div>
                <div className="form-check">
                    <input type="radio" id="month" name="timeFrame" value="30"
                           checked={timeFrame === '30'} onChange={e => setTimeFrame(e.target.value)}
                           className="form-check-input"/>
                    <label htmlFor="month" className="form-check-label">Month</label>
                </div>
            </div>
        </form>
    );
}

export default SearchBox;
