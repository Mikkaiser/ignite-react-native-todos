import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: tasks.length + 1,
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {

    setTasks(oldState => oldState.map(task => {
      task.id == id ? task.done = !task.done : null;
      return task;
    }))

    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {

    setTasks(oldTasks => oldTasks.filter(
      task => task.id != id
    ))
    //TODO - remove task from state
  }

  function handleEditTask(id: number, newTaskTitle: string) {
    setTasks(oldState => oldState.map(task => {
      task.id ? task.title = newTaskTitle : null;
      return task;
    }))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})