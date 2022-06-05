import { useState } from "react";
import { Stack, Autocomplete, TextField, createFilterOptions  } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Search(props) {

    var items = props.items;

    const Users = JSON.parse(localStorage.getItem("users"));
    const [SearchOption, SetSearchOption] = useState("SearchById");

    const navigate = useNavigate();

    const SortProductsByCategory = (items) =>
    {
        return items.sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
    }
    const SortOrdersByCustomerName = (items) =>
    {
        return items.sort((a,b) => (GetCustomerNameForAnOrder(a) > GetCustomerNameForAnOrder(b)) ? 1 : ((GetCustomerNameForAnOrder(b) > GetCustomerNameForAnOrder(a)) ? -1 : 0));
    }


    const GetCustomerNameForAnOrder = (order) =>
    {
        return Users.find(user => user.id === order.userID).name;
    }

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => Users.find(user => user.id === option.userID).name,
    });
      

    const ChangeSearchOption = (e) => {
        SetSearchOption(e.target.value);
    }

    const handleChange = (event, value) => {
        if (props.type === "product") {
            navigate(value.category + '/' + value.url);
        }
        if (props.type === "customer") {
            navigate(value.name, { state: { user: value } });
        }
        if (props.type === "order") {
            navigate(String(value.orderID), { state: { user: Users.find(user => user.id === value.userID), order: value } });
        }


    }
    if (props.type === "product")
        return (
            <Stack spacing={2} width='250px'>
                <Autocomplete
                    options={SortProductsByCategory(items)}
                    groupBy={(item) => item.category}
                    renderInput={(params) => <TextField {...params} label='Products' />}
                    onChange={(event, value) => handleChange(event, value)}
                    getOptionLabel={(item) => item.name}
                />
            </Stack>
        );
    if (props.type === "customer")
        return (
            <Stack spacing={2} width='250px'>
                <Autocomplete
                    options={items}
                    renderInput={(params) => <TextField {...params} label='Customers' />}
                    getOptionLabel={(item) => item.name}
                    onChange={(event, value) => handleChange(event, value)}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                />
            </Stack>
        );

    if (props.type === "order")
        return (
            <section>
                <input type="radio" name="searchOption" id="SearchById" value="SearchById" onChange={(e) => ChangeSearchOption(e)} defaultChecked />By order ID <br />
                <input type="radio" name="searchOption" id="SearchByCustomerName" value="SearchByCustomerName" onChange={(e) => ChangeSearchOption(e)} />By customer name <br /> <br />
                {SearchOption === "SearchById" &&
                <Stack spacing={2} width='250px'>
                    <Autocomplete
                        options={SortOrdersByCustomerName(items)}
                        groupBy={(item) => GetCustomerNameForAnOrder(item)}
                        renderInput={(params) => <TextField {...params} label='Orders' />}
                        getOptionLabel={(item) => String(item.orderID)}
                        onChange={(event, value) => handleChange(event, value)}
                    />
                </Stack>
                }
                {SearchOption === "SearchByCustomerName" &&
                <Stack spacing={2} width='250px'>
                    <Autocomplete
                        options={SortOrdersByCustomerName(items)}
                        groupBy={(item) => GetCustomerNameForAnOrder(item)}
                        renderInput={(params) => <TextField {...params} label='Orders' />}
                        getOptionLabel={(item) => String(item.orderID)}
                        onChange={(event, value) => handleChange(event, value)}
                        filterOptions={filterOptions}
                    />
                </Stack>
                }
            </section>
        );



}
