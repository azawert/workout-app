export const addPrevValues = (log: any, prevLog: any | null = null) => {
	return log.times?.map((item: any, index: number) => ({
		...item,
		prevWeight: prevLog && prevLog.times ? prevLog.times[index].weight : 0,
		prevRepeat: prevLog && prevLog.times ? prevLog.times[index].repeat : 0
	}))
}
