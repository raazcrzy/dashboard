import React from 'react';
import { Card } from 'antd';
import { css } from 'emotion';
import { Circle } from 'rc-progress';
import get from 'lodash/get';
import Flex from '../../shared/Flex';
import { common } from '../../shared/helper';
import { billingService } from '../../service/BillingService';
import { Button as UpgradeButton } from './../../../modules/batteries/components/Mappings/styles';

const percentCls = css`
	top: 40px;
	position: absolute;
	width: 100%;
	text-align: center;
`;
const upgradeBtnDanger = css`
	background-color: red;
	color: #fff;
	margin-top: 30px;
	width: 100%;
`;
const upgradeBtn = css`
	margin-top: 30px;
	width: 100%;
`;
const shouldShowUpgrade = (plan, appCount) => {
	if (plan === 'free') {
		return { show: true };
	} else if (plan === 'growth') {
		return { show: false };
	}
	// if plan is bootsrap
	if (get(appCount, 'records.percentage') > 70 || get(appCount, 'action.percentage') > 70) {
		return { show: true, danger: true };
	}
	return { show: true };
};
const UsageDetails = ({ plan, appCount }) => {
	const showUpgrade = shouldShowUpgrade(plan, appCount);
	return (
		<Card title="Usage this month" css="width: 300px;height: 100%">
			<Flex justifyContent="center" alignItems="center">
				<div css="width: 100px;position: relative">
					<div css={percentCls}>{`${get(appCount, 'action.percentage')}%`}</div>
					<Circle
						style={{
							minWidth: '100px',
						}}
						percent={get(appCount, 'action.percentage')}
						strokeWidth="5"
						trailWidth="5"
						strokeColor="#4F8FFD"
					/>
					<Flex flexDirection="column" justifyContent="center" alignItems="center">
						<div className="sub-title">API calls</div>
						{plan ? (
							<div>
								<strong>
									{common.compressNumber(get(appCount, 'action.count'))}
								</strong>&nbsp;/&nbsp;
								<span>
									{common.compressNumber(billingService.planLimits[plan].action)}
								</span>
							</div>
						) : null}
					</Flex>
				</div>
				<div css="width: 100px;position: relative;margin-left: 20px">
					<div css={percentCls}>{`${get(appCount, 'records.percentage')}%`}</div>
					<Circle
						style={{
							minWidth: '100px',
						}}
						percent={get(appCount, 'records.percentage')}
						strokeWidth="5"
						trailWidth="5"
						strokeColor="#4F8FFD"
					/>
					<Flex flexDirection="column" justifyContent="center" alignItems="center">
						<div>Records</div>
						{plan ? (
							<div>
								<strong>
									{common.compressNumber(get(appCount, 'records.count'))}
								</strong>&nbsp;/&nbsp;
								<span>
									{common.compressNumber(billingService.planLimits[plan].records)}
								</span>
							</div>
						) : null}
					</Flex>
				</div>
			</Flex>
			<Flex justifyContent="center" alignItems="center">
				{showUpgrade.show && (
					<UpgradeButton
						css={showUpgrade.danger ? upgradeBtnDanger : upgradeBtn}
						href="/billing"
						target="_blank"
					>
						Upgrade Now
					</UpgradeButton>
				)}
			</Flex>
		</Card>
	);
};

export default UsageDetails;
