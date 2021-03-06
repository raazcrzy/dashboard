import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import Flex from '../../shared/Flex';
import UsageDetails from './UsageDetails';
import { getAnalytics } from './../../../modules/batteries/components/analytics/utils';
import SearchVolumeChart from './../../../modules/batteries/components/shared/Chart/SearchVolume';
import Searches from './../../../modules/batteries/components/analytics/components/Searches';
import RequestLogs from './../../../modules/batteries/components/analytics/components/RequestLogs';

class PaidUserDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// isFetching: true,
			noResults: [],
			popularSearches: [],
			searchVolume: [],
		};
	}
	componentDidMount() {
		getAnalytics(this.props.appName)
			.then((res) => {
				this.setState({
					noResults: res.noResultSearches,
					popularSearches: res.popularSearches,
					searchVolume: res.searchVolume,
					// isFetching: false,
				});
			})
			.catch((e) => {
				this.setState({
					// isFetching: false,
				});
				console.log('ERROR=>', e);
			});
	}
	redirectTo = (tab) => {
		window.location = `${window.location.origin}/analytics/${this.props.appName}/${tab}`;
	};
	render() {
		const { plan, appCount } = this.props;
		const { searchVolume, popularSearches, noResults } = this.state;
		return (
			<div css="padding: 40px">
				<Flex justifyContent="space-between">
					<div css="margin-right: 10px">
						<UsageDetails plan={plan} appCount={appCount} />
					</div>
					<Card css="margin-left: 10px" title="Daily Search Volume">
						<SearchVolumeChart
							width={window.innerWidth - 580}
							height={210}
							data={searchVolume}
						/>
					</Card>
				</Flex>
				<Flex css="width: 100%;margin-top: 20px">
					<div css="flex: 50%;margin-right: 10px">
						<Searches
							onClick={() => this.redirectTo('popularSearches')}
							dataSource={popularSearches}
							title="Popular Searches"
						/>
					</div>
					<div css="flex: 50%;margin-left: 10px">
						<Searches
							onClick={() => this.redirectTo('noResultSearches')}
							dataSource={noResults}
							title="No Result Searches"
						/>
					</div>
				</Flex>
				<div css="margin-top: 20px">
					<RequestLogs
						pageSize={5}
						changeUrlOnTabChange={false}
						appName={this.props.appName}
					/>
				</div>
			</div>
		);
	}
}
PaidUserDashboard.propTypes = {
	plan: PropTypes.string,
	appCount: PropTypes.object,
	appName: PropTypes.string,
};
export default PaidUserDashboard;
