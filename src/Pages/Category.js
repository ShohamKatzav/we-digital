
import { useLocation } from 'react-router-dom'
import ViewProducts from "../Components/ViewProducts";


export default function Category() {
    const location = useLocation();


    if (location.state)
        return (
            <div>
                <div className="Centered">
                    <div className='CenteredForm'>
                        <h1 className='PageHeader'><span>{location.state.category}</span></h1>
                    </div>
                    <ViewProducts category={location.state.category} />
                </div>
            </div>
        );
    else
        return (<div>Page Not Found</div>);

}
