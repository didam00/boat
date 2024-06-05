import styles from "./page.module.scss";

export default function RegisterPage() {
  return (
    <form action="/api/user/register" className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.formLabel}>이메일</label>
        <input id="email" name="email" type="email" className={styles.formInput} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="username" className={styles.formLabel}>아이디</label>
        <input id="username" name="username" type="text" className={styles.formInput} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="nickname" className={styles.formLabel}>별명</label>
        <input id="nickname" name="nickname" type="text" className={styles.formInput} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.formLabel}>비밀번호</label>
        <input id="password" name="password" type="password" className={styles.formInput} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.formLabel}>비밀번호 확인</label>
        <input id="name" name="name" type="password" className={styles.formInput} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phoneNumber" className={styles.formLabel}>전화번호</label>
        <input id="phoneNumber" name="phoneNumber" type="text" className={styles.formInput} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="country" className={styles.formLabel}>국가</label>
        <input id="country" name="country" type="text" className={styles.formInput} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="city" className={styles.formLabel}>도시</label>
        <input id="city" name="city" type="text" className={styles.formInput} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="birthday" className={styles.formLabel}>생년월일</label>
        <input id="birthday" name="birthday" type="date" className={styles.formInput} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="job" className={styles.formLabel}>직업</label>
        <input id="job" name="job" type="text" className={styles.formInput} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="gender" className={styles.formLabel}>성별</label>
        <input id="gender" name="gender" type="text" className={styles.formInput} />
      </div>
      <button type="submit" className={styles.submitButton}>가입</button>
    </form>
  );
};