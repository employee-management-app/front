import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import { Grid, GridEl, SPACES } from '../Grid';
import { Text } from '../Text';
import styles from './CompaniesList.module.scss';
import { Tabs, Tab, TabsItems, TabsItem } from '../Tabs';
import { fetchCompanyManagers } from '../../services/fetchCompanyManagers';
import { fetchCompanyEmployees } from '../../services/fetchCompanyEmployees';
import { Spinner } from '../Spinner';
import { ManagersList } from '../ManagersList';
import { EmployeesList } from '../EmployeesList';
import { getEmployees, getManagers, setCompany, setEmployees, setManagers } from '../../store';

export const CompaniesList = ({ companies }) => {
  const dispatch = useDispatch();
  const managers = useSelector(getManagers);
  const employees = useSelector(getEmployees);
  const [activeCompanyIndex, setActiveCompanyIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const activeCompanyId = companies[activeCompanyIndex]._id;
      const [_managers, _employees] = await Promise.all([
        fetchCompanyManagers(activeCompanyId),
        fetchCompanyEmployees(activeCompanyId),
      ]);

      dispatch(setManagers(_managers));
      dispatch(setEmployees(_employees));
      setIsLoading(false);
    };

    dispatch(setCompany(companies[activeCompanyIndex]));
    setIsLoading(true);
    fetchData();
  }, [activeCompanyIndex, companies, dispatch]);

  return (
    <Grid space={SPACES.L}>
      <GridEl size="12">
        <Tabs active={activeCompanyIndex} onChange={setActiveCompanyIndex}>
          {companies.map((company, index) => (
            <Tab id={index} key={company._id}>
              {company.name}
            </Tab>
          ))}
        </Tabs>
      </GridEl>
      <GridEl size="12">
        <TabsItems active={activeCompanyIndex}>
          {companies.map((company, index) => (
            <TabsItem for={index} key={company._id}>
              <Grid space={SPACES.S}>
                <GridEl size="12">
                  <Text>
                    <Text fontWeight="600" inline>Company name:</Text>
                    {' '}{company.name}
                  </Text>
                </GridEl>
                <GridEl size="12">
                  <Grid alignItems="center" space={SPACES.S}>
                    <GridEl>
                      <Text fontWeight="600" inline>Logo:</Text>
                    </GridEl>
                    <GridEl>
                      {company.logo
                        ? <img src={company.logo} width={100} height={50} className={styles.logo} alt="" />
                        : <div className={styles.placeholder}> -</div>}
                    </GridEl>
                  </Grid>
                </GridEl>
              </Grid>
            </TabsItem>
          ))}
        </TabsItems>
      </GridEl>
      <GridEl size="12">
        <Grid space={SPACES.S}>
          <GridEl size="12">
            <Text fontWeight="600" inline>Managers</Text>
          </GridEl>
          <GridEl size="12">
            {isLoading ? <Spinner /> : <ManagersList managers={managers} />}
          </GridEl>
        </Grid>
      </GridEl>
      <GridEl size="12">
        <Grid space={SPACES.S}>
          <GridEl size="12">
            <Text fontWeight="600" inline>Employees</Text>
          </GridEl>
          <GridEl size="12">
            {isLoading ? <Spinner /> : <EmployeesList employees={employees} />}
          </GridEl>
        </Grid>
      </GridEl>
    </Grid>
  );
};
