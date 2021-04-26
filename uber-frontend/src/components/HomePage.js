import React from 'react';
import {
    Button,
    Divider,
    Nav,
    NavItem,
    NavList,
    Page,
    PageHeader,
    PageSection,
    PageSectionVariants,
    PageSidebar,
    PageHeaderTools,
    SelectOption,
    Text,
    TextContent,
    Select, 
    SelectVariant,
    EmptyState,
  EmptyStatePrimary,
  EmptyStateIcon,
  EmptyStateBody,
  Title
  } from '@patternfly/react-core';
  import SearchIcon from '@patternfly/react-icons/dist/js/icons/search-icon';

  import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';
  import { DatePicker } from '@patternfly/react-core';
  import { TableComposable, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.options = [
      <SelectOption key={0} value="Haymarket Square" />,
      <SelectOption key={1} value="Back Bay" />,
      <SelectOption key={2} value="North End" />,
      <SelectOption key={3} value="North Station" />,
      <SelectOption key={4} value="Beacon Hill" />,
      <SelectOption key={5} value="Boston University" />
    ];

    this.Toptions = [
        <SelectOption key={0} value="Haymarket Square" />,
        <SelectOption key={1} value="Back Bay" />,
        <SelectOption key={2} value="North End" />,
        <SelectOption key={3} value="North Station" />,
        <SelectOption key={4} value="Beacon Hill" />,
        <SelectOption key={5} value="Boston University" />
      ];

    this.state = {
      isOpen: false,
      isTOpen: false,
      selected: null,
      Tselected: null,
      isNavOpen: false,
      activeItem: 0,
      source: '',
      destination: '',
      journeyDate: new Date(),
      username: localStorage.getItem("role"),
      avail: [],
      searchFlag: true,
      bookHistoryFlag: false,
      bookings: [],
      FLASK_URL: process.env.REACT_APP_URL || 'http://localhost:5000'
    };

    this.onNavSelect = result => {
      this.setState({
        activeItem: result.itemId
      });
    };

    this.toggleSearchFlag = () => {
      this.setState({
        searchFlag: true,
        bookHistoryFlag: false
      });
      console.log(this.state.searchFlag);
    }

    this.getBookingHistory = async () => {
      console.log('Get History function');
      const loggedInUser = localStorage.getItem("role");
      console.log('User state value is ' + loggedInUser);

       if(typeof(loggedInUser) == 'undefined' || loggedInUser == null){
         console.log('Type found is null')
         //setBookings([]);
         this.setState({
          bookings:[]
        });
        
         return;
       }
       const paramdict = {
         "username":loggedInUser
       }

     try {
       const config = {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(paramdict)
       }
       const response = await fetch(this.state.FLASK_URL+'/showBookedTickets', config);
       //const json = await response.json()

       try {
         const data = await response.json();
         console.log("on reply:")
         console.log(data);
         this.setState({
          bookings:data
        });
        console.log(this.state.bookings);
        return;
       } catch (err) {
         console.log(err);
         alert("exception on reply!");
         return;
       }

     } catch (error) {
       console.log(error);
       alert("exception on send");
     }
   }
    

    this.toggleHistoryFlag = () => {
      this.setState({
        bookHistoryFlag: true,
        searchFlag: false
      });
      this.getBookingHistory();
      console.log(this.state.bookHistoryFlag);
    }



    this.onDateChange = date => {
        this.setState({
            journeyDate: date
          });  
        console.log('date : ' + date)    
    }

    this.onNavToggle = () => {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      };

   

    this.onToggle = isOpen => {
      this.setState({
        isOpen
      });
    };

    this.onTToggle = isTOpen => {
        this.setState({
          isTOpen
        });
      };
    

    this.onSelect = (event, selection, isPlaceholder) => {
      if (isPlaceholder) this.clearSelection();
      else {
        this.setState({
          selected: selection,
          isOpen: false,
          source: selection
        });
        console.log('selected:', selection);
      }
    };

    this.onTSelect = (event, selection, isPlaceholder) => {
        if (isPlaceholder) this.clearTSelection();
        else {
          this.setState({
            Tselected: selection,
            isTOpen: false,
            destination: selection
          });
          console.log('selected:', selection);
        }
      };

    this.clearSelection = () => {
      this.setState({
        selected: null,
        isOpen: false,
        source: ''
      });
    };

    this.clearTSelection = () => {
        this.setState({
          Tselected: null,
          isTOpen: false,
          destination: ''
        });
      };

    this.customFilter = e => {
      let input;
      try {
        input = new RegExp(e.target.value, 'i');
      } catch (err) {}
      return e.target.value !== '' ? this.options.filter(child => input.test(child.props.value)) : this.options;
    };

    this.customTFilter = e => {
        let input;
        try {
          input = new RegExp(e.target.value, 'i');
        } catch (err) {}
        return e.target.value !== '' ? this.Toptions.filter(child => input.test(child.props.value)) : this.Toptions;
      };

    this.onSearchClick = async () => {
    const loggedInUser = localStorage.getItem("role");
    console.log('User : ' + loggedInUser);

    console.log("Input search data");
    console.log("Source : " + this.state.source)
    console.log("Destination : " + this.state.destination)
    console.log("Date : " + this.state.journeyDate)

    if(this.state.source==='' || this.state.destination===''){
      toast("Invalid details");
      return;
    }


    const dateSplit = this.state.journeyDate.split("-");
    console.log(dateSplit[2])
    const paramdict = {
      "ticketFrom": this.state.source,
      "ticketTo": this.state.destination,
      "ticketDay": parseInt(dateSplit[2]),
      "ticketMonth": parseInt(dateSplit[1])
    }

    try {
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paramdict)
      }
      const response = await fetch(this.state.FLASK_URL+'/search', config);
      //const json = await response.json()
      if (response.ok) {
        //return json
        //return response
        console.log("success on send.");

      } else {
        alert("launch: failure on send!");
      }

      try {
        const data = await response.json();
        console.log("on reply:")
        console.log(data);
        this.setState({
            avail: data
        });
        //setAvail([...data]);
        
      } catch (err) {
        console.log(err);
        alert("exception on reply!");
      }

    } catch (error) {
      console.log(error);
      alert("exception on send");
    }

    };

    this.onItemClick = async (item) => {

      const loggedInUser = localStorage.getItem("role");
      console.log('User state value is ' + this.state.username);

      if(loggedInUser === null || typeof(loggedInUser)===undefined){
        alert('Please sign in first');
        return;
      }
      

      const paramdict = {
        'username': loggedInUser,
        'ticketFrom': item.source,
        'ticketTo': item.destination,
        'ticketDate': item.datetime
      }
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paramdict)
      }
      const response = await fetch(this.state.FLASK_URL+'/insertBook', config);
      //const json = await response.json()
      if (response.ok) {
        console.log("success on send.");

      } else {
        alert("launch: failure on send!");
      }
      try {
        const data = await response.json();
        console.log("on reply:")
        console.log(data);
        alert(data);
        return;
      } catch (err) {
        console.log(err);
        alert("exception on reply!");
        return;
      }

    }

   this.handleLogOut = async () => {
    const loggedInUser = localStorage.getItem("role");
    console.log('User : ' + loggedInUser);

    const paramdict = {
      'username': loggedInUser
    }

    try {
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paramdict)
      }
      const response = await fetch(this.state.FLASK_URL+'/userLogOut', config);
      //const json = await response.json()
      if (response.ok) {
        console.log("success on send.");

      } else {
        alert("launch: failure on send!");
      }
      try {
        const data = await response.json();
        console.log("on reply:")
        console.log(data);
        if (data === "User Already Logged Out") {
          alert('Already Logged Out')
          return "<h1>Already Logged Out</h1>";
        } else {
          localStorage.removeItem("role");
          //localStorage.removeItem("bustoken");
          console.log(data.username);
          this.props.history.push('/');
          alert('Logout Successful');
          return "<h1>Logout Successful</h1>";
        }

      } catch (err) {
        console.log(err);
        alert("exception on reply!");
      }

    } catch (error) {

    }
   };

  }

  render() {
    const { isNavOpen, activeItem, isOpen, selected, isTOpen, Tselected, avail, searchFlag, bookHistoryFlag, bookings } = this.state;
    const titleId = 'typeahead-select-id-1';
    const titleTId = 'typeahead-select-id-2';
    const pageId = 'main-content-page-layout-default-nav';
    const minDate = new Date();
    const maxDate = new Date(2022, 8, 20);
    const rangeValidator = date => {
      if (date < minDate) {
        return 'Date is before the allowable range.';
      }
      else if (date > maxDate) {
        return 'Date is after the allowable range.';
      }
  
      return '';
    };

    const logoProps = {
      href: 'https://www.mbta.com/',
      onClick: () => console.log('clicked logo'),
      target: '_blank'
    };

    const PageNav = (
        <Nav onSelect={this.onNavSelect} aria-label="Nav">
          <NavList>
            <NavItem itemId={0} isActive={activeItem === 0} onClick={this.toggleSearchFlag}>
              Search
            </NavItem>
            <NavItem itemId={1} isActive={activeItem === 1} onClick={this.toggleHistoryFlag}>
              History
            </NavItem>
            <NavItem itemId={2} isActive={activeItem === 2} onClick={this.handleLogOut}>
              Log Out
            </NavItem>
           </NavList>
        </Nav>
      );

      const Header = (
        <PageHeader
          logo="MBTA"
          logoProps={logoProps}
          headerTools={<PageHeaderTools> {this.state.username == null? (<a href="/">Sign In</a>) :("Signed In As : " + this.state.username)}</PageHeaderTools>}
          showNavToggle
          isNavOpen={isNavOpen}
          onNavToggle={this.onNavToggle}
        />
      );
      const Sidebar = <PageSidebar nav={PageNav} isNavOpen={isNavOpen} />;

      const columns = ['Source', 'Destination', 'Date','Book'];
      const bookingcols = ['Booking ID','Source','Destination','Journey Date','Booking Date'];

    return (
       <React.Fragment>
        <ToastContainer />
        <Page header={Header} sidebar={Sidebar} mainContainerId={pageId}> 
         {searchFlag && <div>   
        <PageSection variant={PageSectionVariants.light} padding={{ default: 'padding', md: 'padding', lg: 'padding' }}>
        <TextContent>
            <Text component="h1" >Search</Text>
            <Text component="p">Please enter the Journey details</Text>
        </TextContent>
        </PageSection>
         <Divider component="div" />
        <PageSection padding={{ default: 'Padding', sm: 'noPadding', md: 'padding', lg: 'padding' }}>  
        <span id={titleTId} hidden>
          Select a source
        </span>
        <Select
          variant={SelectVariant.typeahead}
          typeAheadAriaLabel="Source"
          onToggle={this.onToggle}
          onSelect={this.onSelect}
          onClear={this.clearSelection}
          onFilter={this.customFilter}
          selections={selected}
          isOpen={isOpen}
          aria-labelledby={titleId}
          placeholderText="Source"
        >
          {this.options}
        </Select>
     
        <span id={titleId} hidden>
          Select a source
        </span>
        <Select
          variant={SelectVariant.typeahead}
          typeAheadAriaLabel="Destination"
          onToggle={this.onTToggle}
          onSelect={this.onTSelect}
          onClear={this.clearTSelection}
          onFilter={this.customTFilter}
          selections={Tselected}
          isOpen={isTOpen}
          aria-labelledby={titleTId}
          placeholderText="Destination"
          isRequired
        >
          {this.Toptions}
        </Select>
        <DatePicker validators={[rangeValidator]} onChange={this.onDateChange}/>

        <Button variant="link" isLarge onClick={this.onSearchClick}>Search to action <ArrowRightIcon/></Button>
        
        </PageSection>

        <PageSection>
                <TableComposable aria-label="Actions table">
            <Thead>
                <Tr>
                <Th>{columns[0]}</Th>
                <Th>{columns[1]}</Th>
                <Th>{columns[2]}</Th>
                <Th>{columns[3]}</Th>
                </Tr>
            </Thead>
            <Tbody>
                {avail.map((item, i) => (
                <Tr key={`row-${i}`}>
                    <Td dataLabel={columns[0]}>
                        {item.source}
                    </Td>
                    <Td dataLabel={columns[1]}>
                        {item.destination}
                    </Td>
                    <Td dataLabel={columns[2]}>
                        {item.datetime}
                    </Td>                
                    <Td>
                    <Button variant="secondary" isSmall onClick={() => this.onItemClick(item)}>Book</Button>
                    </Td>                  
                </Tr>
                ))}
            </Tbody>
            </TableComposable>


        </PageSection>
        </div>}
        {bookHistoryFlag && bookings.length === 0 &&
                   <PageSection>
                   <EmptyState>
                      <EmptyStateIcon icon={SearchIcon} />
                      <Title size="lg" headingLevel="h4">
                        No results found
                      </Title>
                      <EmptyStateBody>
                        No results match the filter criteria. Remove all filters or clear all filters to show results.
                      </EmptyStateBody>
                      <EmptyStatePrimary>
                        <Button variant="link">Clear all filters</Button>
                      </EmptyStatePrimary>
                    </EmptyState>
           </PageSection>}          
        {bookHistoryFlag && bookings !== [] &&
                   <PageSection>
                   <TableComposable aria-label="Bookings table">
               <Thead>
                   <Tr>
                   <Th>{bookingcols[0]}</Th>
                   <Th>{bookingcols[1]}</Th>
                   <Th>{bookingcols[2]}</Th>
                   <Th>{bookingcols[3]}</Th>
                   <Th>{bookingcols[4]}</Th>
                   </Tr>
               </Thead>
               <Tbody>
                   {bookings.map((item, i) => (
                   <Tr key={`row-${i}`}>
                       <Td dataLabel={bookingcols[0]}>
                           {item._id}
                       </Td>
                       <Td dataLabel={bookingcols[1]}>
                           {item.ticketFrom}
                       </Td>
                       <Td dataLabel={bookingcols[2]}>
                           {item.ticketTo}
                       </Td>                
                       <Td dataLabel={bookingcols[3]}>
                           {item.bookeddate}
                       </Td>
                       <Td dataLabel={bookingcols[4]}>
                           {item.creationdate}
                       </Td>                 
                   </Tr>
                   ))}
               </Tbody>
               </TableComposable>
   
   
           </PageSection>}
           
            </Page>
            </React.Fragment>
    );
  }
}