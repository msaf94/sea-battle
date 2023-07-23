import type { Component } from 'solid-js';
import { currentPlayerStore } from 'store/currentPlayerStore';
import { getRandomShipsPlacement } from 'store/helpers/getRandomShipsPlacement';

export const Random: Component = () => {
    const { resetShips, setShips } = currentPlayerStore;

    function clickHandler() {
        resetShips();

        setShips(getRandomShipsPlacement());
    }

    return (
        <div onClick={clickHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 1200 1200">
                <path d="M935.926 42.203v186.061H763.958c-54.408 0-114.484 26.559-164.729 77.32-50.242 50.761-104.842 126.065-191.527 249.904-87.076 124.394-135.567 199.565-165.807 233.346-30.24 33.78-25.376 30.882-69.388 30.882H0v147.863h172.507c66.078 0 132.54-27.619 179.515-80.093 46.975-52.475 91.312-125.164 176.742-247.208 85.82-122.601 140.381-195.159 175.512-230.651 35.129-35.491 36.641-33.5 59.685-33.5h171.967v194.147L1200 306.276 935.926 42.203zM0 228.263v147.863h172.507c44.012 0 39.148-2.975 69.388 30.805 19.456 21.734 51.507 67.826 91.49 125.915 5.419-7.773 7.973-11.521 13.708-19.716 21.78-31.114 41.563-59.187 59.838-84.79 6.36-8.91 11.688-15.939 17.714-24.259-27.021-39.039-49.525-70.001-72.623-95.803-46.975-52.474-113.437-80.015-179.515-80.015H0zm935.926 401.464v189.988H763.958c-23.043 0-24.554 1.915-59.684-33.577-23.237-23.477-56.146-65.093-99.809-124.76-5.281 7.49-9.555 13.418-15.095 21.333-30.571 43.674-51.648 75.183-73.777 107.816 31.395 41.578 58.12 73.875 83.637 99.652 50.242 50.763 110.319 77.397 164.729 77.397h171.968v190.22L1200 893.801 935.926 629.727z" />
            </svg>
        </div>
    );
};
