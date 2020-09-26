import React, { useRef } from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  requestItems,
  receiveItems,
  PaginateItems,
  catchError,
} from "../../actions";
import { FilteredItemsByBody } from "../../filterHelpers";

const TypeAhead = ({ setIsOpen }) => {
  const allItems = useSelector((state) => state.feed.items.items);
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.feed;
  });

  const currentFilter = data.filter;

  React.useEffect(() => {
    if (allItems === undefined) {
      dispatch(requestItems());
      fetch("/bigData")
        .then((res) => res.json())
        .then((json) => {
          dispatch(receiveItems(json));
          if (currentFilter !== null) {
            dispatch(
              PaginateItems(FilteredItemsByBody(currentFilter, json.items))
            );
            return;
          }
          dispatch(PaginateItems(json.items));
        })
        .catch((err) => {
          dispatch(catchError(err));
        });
    }
  }, []);

  const [searchTerm, setSearchTerm] = React.useState("");

  const searchRef = useRef(null);

  React.useEffect(() => {
    if (allItems !== undefined) {
      searchRef.current.focus();
    }
  }, [allItems]);
  let matchedItemsArray = [];

  if (allItems !== undefined) {
    matchedItemsArray = allItems.filter((item) => {
      let LowerCaseSearch = searchTerm.toLowerCase();
      let itemLowerCaseName = item.name.toLowerCase();
      if (
        searchTerm !== "" &&
        searchTerm.length >= 2 &&
        itemLowerCaseName.includes(LowerCaseSearch)
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (!allItems) {
    return <div></div>;
  }

  return (
    <Wrapper onClick={() => setIsOpen(false)}>
      <InnerWrapper onClick={(ev) => ev.stopPropagation()}>
        <Input
          ref={searchRef}
          value={searchTerm}
          onChange={(ev) => {
            ev.stopPropagation();
            setSearchTerm(ev.target.value);
          }}
        />
        {matchedItemsArray.length > 1 && (
          <DropDown>
            {matchedItemsArray.map((item, index) => {
              let lowerCaseItemName = item.name.toLowerCase();
              let lowerCaseSearchTerm = searchTerm.toLowerCase();
              let indexOfSearch = lowerCaseItemName.indexOf(
                lowerCaseSearchTerm
              );
              let indexToSlice = indexOfSearch;
              let firstSlice = item.name.slice(0, indexToSlice);
              let secondSlice = item.name.slice(indexToSlice);

              return (
                <SearchResult key={item._id + index}>
                  <ItemsPrediction
                    to={`/items/${item._id}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FirstSlice>
                      {`${firstSlice}`}
                      <Prediction>{`${secondSlice}`}</Prediction>
                    </FirstSlice>
                  </ItemsPrediction>
                </SearchResult>
              );
            })}
          </DropDown>
        )}
      </InnerWrapper>
    </Wrapper>
  );
};
export default TypeAhead;

const Wrapper = styled.div`
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 100%;
`;

const InnerWrapper = styled.div`
  background: white;
  z-index: 400;
  width: 85%;
  border-radius: 5px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 70%;
  border: 1px solid ${COLORS.PURPLE.PRIMARY};
  height: 30px;
  border-radius: 3px;
  margin-bottom: 5px;
`;

const DropDown = styled.ul`
  width: 70%;
  background: white;
  border-left: 1px solid ${COLORS.PURPLE.PRIMARY};
  border-bottom: 1px solid ${COLORS.PURPLE.PRIMARY};
  border-right: 1px solid ${COLORS.PURPLE.PRIMARY};
  text-align: center;
  text-decoration: none;
  max-height: 300px;
  overflow: scroll;
`;

const SearchResult = styled.li`
  background: white;
  margin-bottom: 10px;
`;

const Prediction = styled.span`
  font-weight: 700;
  background: white;
`;

const ItemsPrediction = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 1em;
`;

const FirstSlice = styled.span`
  background: white;
`;
