
import { useLocation } from 'react-router-dom'
import ViewProducts from "../Components/ViewProducts";


export default function Category() {
    const location = useLocation();


    if (location.state)
        return (
            <div>
                <div className="Centered">
                    <h1 className='PageHeader'>{location.state.category}</h1>
                    <ViewProducts category={location.state.category} />
                </div>
            </div>
        );
    else
        return (<div>Page Not Found</div>);

}
