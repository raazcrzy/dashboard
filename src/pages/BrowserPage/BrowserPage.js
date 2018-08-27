import React, { Component } from 'react';
import { Row, Col, Button, Icon } from 'antd';

import Header from '../../components/Header';

export default class BrowserPage extends Component {
	render() {
		return (
			<Header compact>
				<Row type="flex" justify="space-between" gutter={16}>
					<Col md={18}>
						<h2>Browse Data</h2>

						<Row>
							<Col span={18}>
								<p>
									Our analytics feature can do much more! Discover what you could
									do by enabling our metrics on Clicks and Conversions, Filters,
									Results.
								</p>
							</Col>
						</Row>
					</Col>
					<Col
						md={6}
						css={{
							display: 'flex',
							flexDirection: 'column-reverse',
							paddingBottom: 20,
						}}
					>
						<Button size="large" type="primary">
							<Icon type="customer-service" />
							Talk to Support
						</Button>
						<p
							css={{
								marginTop: 20,
								fontSize: 13,
								textAlign: 'center',
								lineHeight: '20px',
							}}
						>
							Need help with your dataset?
							<br />
							We now offer paid support.
						</p>
					</Col>
				</Row>
			</Header>
		);
	}
}
